/**
 * Firebase service for essay management
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Essay } from '@/types';
import { NotFoundError } from '@/utils/error';

const ESSAYS_COLLECTION = 'essays';

export interface CreateEssayData {
  title: string;
  content: string;
  theme: string;
  userId: string;
}

export interface UpdateEssayData {
  title?: string;
  content?: string;
  theme?: string;
  status?: Essay['status'];
  score?: number;
  feedback?: string;
}

export interface EssayFilters {
  userId?: string;
  status?: Essay['status'];
  theme?: string;
  minScore?: number;
  maxScore?: number;
}

export interface PaginationOptions {
  pageSize?: number;
  lastDoc?: DocumentSnapshot;
}

export const essayService = {
  /**
   * Create a new essay
   */
  async create(data: CreateEssayData): Promise<Essay> {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const essayData = {
      ...data,
      status: 'draft' as const,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, ESSAYS_COLLECTION), essayData);

    return {
      id: docRef.id,
      ...data,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  /**
   * Get essay by ID
   */
  async getById(id: string): Promise<Essay> {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const docRef = doc(db, ESSAYS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new NotFoundError('Essay');
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Essay;
  },

  /**
   * Update essay
   */
  async update(id: string, data: UpdateEssayData): Promise<Essay> {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const docRef = doc(db, ESSAYS_COLLECTION, id);

    // Check if essay exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundError('Essay');
    }

    const updateData = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(docRef, updateData);

    return this.getById(id);
  },

  /**
   * Delete essay
   */
  async delete(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const docRef = doc(db, ESSAYS_COLLECTION, id);

    // Check if essay exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundError('Essay');
    }

    await deleteDoc(docRef);
  },

  /**
   * List essays with filters and pagination
   */
  async list(
    filters: EssayFilters = {},
    pagination: PaginationOptions = {}
  ): Promise<{
    essays: Essay[];
    lastDoc: DocumentSnapshot | null;
    hasMore: boolean;
  }> {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { pageSize = 10, lastDoc } = pagination;
    let q = query(collection(db, ESSAYS_COLLECTION));

    // Apply filters
    if (filters.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.theme) {
      q = query(q, where('theme', '==', filters.theme));
    }
    if (filters.minScore !== undefined) {
      q = query(q, where('score', '>=', filters.minScore));
    }
    if (filters.maxScore !== undefined) {
      q = query(q, where('score', '<=', filters.maxScore));
    }

    // Apply ordering and pagination
    q = query(q, orderBy('createdAt', 'desc'), limit(pageSize + 1));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;
    const essays = docs.slice(0, pageSize).map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Essay;
    });

    return {
      essays,
      lastDoc: docs[pageSize - 1] || null,
      hasMore,
    };
  },

  /**
   * Get user statistics
   */
  async getUserStatistics(userId: string): Promise<{
    totalEssays: number;
    draftEssays: number;
    submittedEssays: number;
    correctedEssays: number;
    averageScore: number;
    recentEssays: Essay[];
  }> {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    // Get all user essays
    const q = query(collection(db, ESSAYS_COLLECTION), where('userId', '==', userId));

    const querySnapshot = await getDocs(q);
    const essays = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Essay;
    });

    // Calculate statistics
    const totalEssays = essays.length;
    const draftEssays = essays.filter((e) => e.status === 'draft').length;
    const submittedEssays = essays.filter((e) => e.status === 'submitted').length;
    const correctedEssays = essays.filter((e) => e.status === 'corrected').length;

    const scoredEssays = essays.filter((e) => e.score !== undefined);
    const averageScore =
      scoredEssays.length > 0
        ? scoredEssays.reduce((sum, e) => sum + (e.score || 0), 0) / scoredEssays.length
        : 0;

    // Get recent essays
    const recentEssays = essays
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    return {
      totalEssays,
      draftEssays,
      submittedEssays,
      correctedEssays,
      averageScore,
      recentEssays,
    };
  },

  /**
   * Submit essay for correction
   */
  async submitForCorrection(id: string): Promise<Essay> {
    return this.update(id, { status: 'submitted' });
  },

  /**
   * Save essay correction
   */
  async saveCorrection(id: string, score: number, feedback: string): Promise<Essay> {
    return this.update(id, {
      status: 'corrected',
      score,
      feedback,
    });
  },

  /**
   * Get essays by theme
   */
  async getByTheme(theme: string, limit = 10): Promise<Essay[]> {
    const result = await this.list({ theme }, { pageSize: limit });
    return result.essays;
  },

  /**
   * Search essays by content
   */
  async search(searchTerm: string, userId?: string): Promise<Essay[]> {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    // Note: This is a basic implementation. For better search,
    // consider using Algolia or Elasticsearch
    let q = query(collection(db, ESSAYS_COLLECTION));

    if (userId) {
      q = query(q, where('userId', '==', userId));
    }

    const querySnapshot = await getDocs(q);
    const essays = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Essay;
    });

    // Filter by search term (client-side)
    const searchLower = searchTerm.toLowerCase();
    return essays.filter(
      (essay) =>
        essay.title.toLowerCase().includes(searchLower) ||
        essay.content.toLowerCase().includes(searchLower) ||
        essay.theme.toLowerCase().includes(searchLower)
    );
  },
};
