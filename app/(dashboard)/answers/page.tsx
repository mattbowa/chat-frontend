"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2, MessageCircleQuestion } from "lucide-react";
import { listQAPairs, deleteQAPair, type QAPair } from "@/lib/api";
import { toast } from "@/lib/toast";
import AnswerModal from "@/components/qa/AnswerModal";

export default function AnswersPage() {
  const [pairs, setPairs] = useState<QAPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<QAPair | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () =>
    listQAPairs()
      .then(({ data }) => setPairs(data))
      .catch(() => toast("Could not load your answers.", "error"))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const remove = async (pair: QAPair) => {
    const previous = pairs;
    setPairs((p) => p.filter((x) => x.id !== pair.id));
    try {
      await deleteQAPair(pair.id);
      toast("Answer deleted.", "success");
    } catch {
      setPairs(previous);
      toast("Could not delete that answer.", "error");
    }
  };

  const upsert = (saved: QAPair) =>
    setPairs((p) => {
      const without = p.filter((x) => x.id !== saved.id);
      return [saved, ...without];
    });

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Answers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hand-written answers to specific questions. Your bot uses these ahead of
            anything in your documents, word for word.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shrink-0"
        >
          <Plus size={15} />
          Add answer
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-10 justify-center">
          <Loader2 size={16} className="animate-spin" />
          Loading…
        </div>
      ) : pairs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-dashed p-10 text-center">
          <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <MessageCircleQuestion size={20} />
          </div>
          <p className="font-medium text-gray-800 mb-1">No answers yet</p>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Add one here, or head to Analytics and answer a question your bot
            couldn&apos;t handle.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pairs.map((pair) => (
            <div key={pair.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="font-medium text-gray-900 text-sm">{pair.question}</p>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setEditing(pair)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition"
                    aria-label="Edit answer"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => remove(pair)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded transition"
                    aria-label="Delete answer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap leading-relaxed">
                {pair.answer}
              </p>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <AnswerModal
          pair={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={upsert}
        />
      )}
    </div>
  );
}
