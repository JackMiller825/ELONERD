export function FAQItem({ question, answer, open = false }: { question: string; answer: string; open?: boolean }) {
  return (
    <details className="faq-item" open={open || undefined}>
      <summary>{question}</summary>
      <p>{answer}</p>
    </details>
  )
}
