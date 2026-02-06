interface AbstractSectionProps {
  description: string;
}

export default function AbstractSection({ description }: AbstractSectionProps) {
  return (
    <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="w-8 h-0.5 bg-accent-teal"></span>
        Abstract
      </h2>
      <p className="text-gray-700 leading-relaxed text-base">
        {description}
      </p>
    </section>
  );
}
