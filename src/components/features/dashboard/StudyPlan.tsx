'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { Plus, GripVertical } from 'lucide-react';

interface StudyItem {
  id: string;
  title: string;
  meta: string;
  completed: boolean;
}

const initialStudyItems = {
  studied: [
    { id: '1', title: 'Estrutura da Introdução', meta: 'Concluído em 15/05', completed: true },
    { id: '2', title: 'Repertórios sobre Tecnologia', meta: 'Concluído em 14/05', completed: true },
    { id: '3', title: 'Conectivos Argumentativos', meta: 'Concluído em 13/05', completed: true },
  ],
  toStudy: [
    { id: '4', title: 'Proposta de Intervenção', meta: 'Prioridade: Alta', completed: false },
    {
      id: '5',
      title: 'Repertórios sobre Meio Ambiente',
      meta: 'Prioridade: Média',
      completed: false,
    },
    { id: '6', title: 'Coesão e Coerência', meta: 'Prioridade: Alta', completed: false },
    { id: '7', title: 'Redação Dissertativa', meta: 'Prioridade: Baixa', completed: false },
  ],
};

function DraggableItem({ item, isCompleted }: { item: StudyItem; isCompleted: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
  });

  // Compute a class for transform if dragging
  const transformClass =
    transform && (transform.x !== 0 || transform.y !== 0)
      ? `drag-transform-x-${transform.x}-y-${transform.y}`
      : '';

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${
        isCompleted ? 'border-green-500' : 'border-blue-500'
      } ${isDragging ? 'opacity-50' : ''} ${transformClass}`}
    >
      <div className="flex items-start gap-3">
        <GripVertical className="w-4 h-4 text-gray-400 mt-1 cursor-grab" />
        <div className="flex-1">
          <h4 className={`font-medium text-gray-800 ${isCompleted ? 'line-through' : ''}`}>
            {item.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{item.meta}</p>
        </div>
      </div>
    </div>
  );
}

function DroppableArea({
  id,
  children,
  title,
  count,
  bgColor,
}: {
  id: string;
  children: React.ReactNode;
  title: string;
  count: number;
  bgColor: string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className={`${bgColor} rounded-xl p-4 sm:p-6 ${isOver ? 'ring-2 ring-blue-400' : ''}`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h3>
        <span
          className={`text-white px-3 py-1 rounded-full text-sm font-medium ${
            title === 'Já Estudei' ? 'bg-green-500' : 'bg-blue-500'
          }`}
        >
          {count}
        </span>
      </div>

      <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
        {children}
      </div>
    </div>
  );
}

export function StudyPlan() {
  const [studyItems, setStudyItems] = useState(initialStudyItems);
  const [newTopic, setNewTopic] = useState('');

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic.trim()) {
      const newItem: StudyItem = {
        id: Date.now().toString(),
        title: newTopic.trim(),
        meta: 'Adicionado hoje',
        completed: false,
      };
      setStudyItems((prev) => ({
        ...prev,
        toStudy: [...prev.toStudy, newItem],
      }));
      setNewTopic('');
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeId = active.id as string;
      const overId = over.id as string;

      // Find the item being dragged
      let draggedItem: StudyItem | null = null;
      let sourceList: 'studied' | 'toStudy' | null = null;

      if (studyItems.studied.find((item) => item.id === activeId)) {
        draggedItem = studyItems.studied.find((item) => item.id === activeId)!;
        sourceList = 'studied';
      } else if (studyItems.toStudy.find((item) => item.id === activeId)) {
        draggedItem = studyItems.toStudy.find((item) => item.id === activeId)!;
        sourceList = 'toStudy';
      }

      if (draggedItem && sourceList) {
        // Determine target list
        const targetList = overId === 'droppable-studied' ? 'studied' : 'toStudy';

        if (sourceList !== targetList) {
          // Update item completion status
          const updatedItem = {
            ...draggedItem,
            completed: targetList === 'studied',
            meta:
              targetList === 'studied'
                ? `Concluído em ${new Date().toLocaleDateString('pt-BR')}`
                : draggedItem.meta,
          };

          setStudyItems((prev) => ({
            studied:
              targetList === 'studied'
                ? [...prev.studied, updatedItem]
                : prev.studied.filter((item) => item.id !== activeId),
            toStudy:
              targetList === 'toStudy'
                ? [...prev.toStudy, updatedItem]
                : prev.toStudy.filter((item) => item.id !== activeId),
          }));
        }
      }
    }
  }

  const totalItems = studyItems.studied.length + studyItems.toStudy.length;
  const completedItems = studyItems.studied.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-6 sm:space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Meu Plano de Estudos
        </h2>
        <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Editar Plano
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Já Estudei */}
          <DroppableArea
            id="droppable-studied"
            title="Já Estudei"
            count={studyItems.studied.length}
            bgColor="bg-gradient-to-br from-green-50 to-emerald-50"
          >
            {studyItems.studied.map((item) => (
              <DraggableItem key={item.id} item={item} isCompleted={true} />
            ))}
          </DroppableArea>

          {/* Quero Estudar */}
          <DroppableArea
            id="droppable-to-study"
            title="Quero Estudar"
            count={studyItems.toStudy.length}
            bgColor="bg-gradient-to-br from-blue-50 to-indigo-50"
          >
            {studyItems.toStudy.map((item) => (
              <DraggableItem key={item.id} item={item} isCompleted={false} />
            ))}

            <form onSubmit={handleAddTopic} className="mt-4 flex gap-3">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Adicionar novo tópico..."
                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Adicionar novo tópico"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </DroppableArea>
        </div>
      </DndContext>

      {/* Progress Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Progresso Geral</h3>
          <span className="text-lg sm:text-xl font-bold text-green-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
          />
        </div>
      </div>
    </motion.section>
  );
}
