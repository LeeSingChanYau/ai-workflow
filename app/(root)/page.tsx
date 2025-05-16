import WelcomePage from '@/components/WelcomePage';

// {
//     "question": "string",
//     "options": ["string", "string", "string", "string"],
//     "answer": 0,
//     "explanation": "string"
// }

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <WelcomePage />
    </div>
  );
}
