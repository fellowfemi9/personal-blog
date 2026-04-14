"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { search, type SearchItem } from "@/lib/search-index";

export default function Search({ dark = false }: { dark?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const results = search(query);
    setResults(results);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    const key = item.post;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div ref={containerRef} className="relative w-full mb-0">
      {/* Search input */}
      <div className={`flex items-center gap-3 border-2 rounded-2xl px-4 py-3 transition-all ${dark ? "bg-white/10 border-amber-400/40 backdrop-blur-sm" : "bg-white border-gray-200"} ${active ? "border-amber-400 shadow-md shadow-amber-100" : ""}`}>
        <span className={`text-lg ${dark ? "text-amber-300" : "text-gray-400"}`}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setActive(true)}
          placeholder="Search... e.g. blood sugar, iron, pregnancy, sleep"
          className={`flex-1 outline-none text-sm bg-transparent ${dark ? "text-white placeholder-amber-300/60" : "text-gray-800 placeholder-gray-400"}`}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="text-gray-300 hover:text-gray-500 transition-colors text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {active && query.trim().length > 1 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden max-h-[480px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">
              No results found. Try different keywords.
            </div>
          ) : (
            <div>
              <div className="px-5 pt-4 pb-2 text-xs text-gray-400 font-semibold uppercase tracking-widest border-b border-gray-50">
                {results.length} tip{results.length !== 1 ? "s" : ""} found
              </div>
              {Object.entries(grouped).map(([post, items]) => (
                <div key={post}>
                  <div className="px-5 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {items[0].postEmoji} {post}
                  </div>
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.postSlug}
                      onClick={() => { setActive(false); setQuery(""); }}
                      className="flex items-start gap-3 px-5 py-3 hover:bg-amber-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <span className="text-base flex-shrink-0 mt-0.5">{item.sectionEmoji}</span>
                      <div>
                        <p className="text-sm text-gray-800 leading-relaxed">{item.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.section}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
