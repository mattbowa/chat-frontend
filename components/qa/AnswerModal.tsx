"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { createQAPair, updateQAPair, type QAPair } from "@/lib/api";
import { toast } from "@/lib/toast";

const MAX_QUESTION = 500;
const MAX_ANSWER = 4000;

type Props = {
  /** Existing pair to edit. Omit to create a new one. */
  pair?: QAPair | null;
  /** Prefills the question when creating — used by the unanswered list. */
  initialQuestion?: string;
  onClose: () => void;
  onSaved: (pair: QAPair) => void;
};

export default function AnswerModal({ pair, initialQuestion = "", onClose, onSaved }: Props) {
  const [question, setQuestion] = useState(pair?.question ?? initialQuestion);
  const [answer, setAnswer] = useState(pair?.answer ?? "");
  const [saving, setSaving] = useState(false);

  // Escape to dismiss — the modal traps nothing else, so this is the only exit
  // besides the buttons.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const save = async () => {
    const q = question.trim();
    const a = answer.trim();
    if (!q || !a) {
      toast("Both a question and an answer are required.", "error");
      return;
    }

    setSaving(true);
    try {
      const { data } = pair
        ? await updateQAPair(pair.id, { question: q, answer: a })
        : await createQAPair({ question: q, answer: a });
      toast(pair ? "Answer updated." : "Answer added — your bot can use it now.", "success");
      onSaved(data);
      onClose();
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      toast(detail ?? "Could not save the answer.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-semibold">{pair ? "Edit answer" : "Add an answer"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, MAX_QUESTION))}
              rows={2}
              placeholder="Do you ship to Ireland?"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Phrase it the way a customer would. Close variations will match too.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value.slice(0, MAX_ANSWER))}
              rows={6}
              placeholder="Yes — standard delivery to Ireland takes 3-5 business days."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Your bot uses this wording as-is, ahead of anything in your documents.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-5 py-4 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {pair ? "Save changes" : "Add answer"}
          </button>
        </div>
      </div>
    </div>
  );
}
