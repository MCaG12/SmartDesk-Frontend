import type { i_AiSuggestionBox } from "../interfaces/i_AiSuggestion";

export function AiSuggestionBox({ aiSuggestion, setProblemSolved }: i_AiSuggestionBox) {
    if (!aiSuggestion) return null;
    return (
        <div>
            <p>{aiSuggestion}</p>
            <button onClick={() => setProblemSolved(true)}>
                Problema resolvido ✓
            </button>
            <button onClick={() => setProblemSolved(false)}>
                Problema não resolvido — Abrir Chamado
            </button>
        </div>
    );
}