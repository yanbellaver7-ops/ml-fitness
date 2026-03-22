'use client'

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ padding: 20 }}>
          <h2>Algo deu errado.</h2>
          <button onClick={() => reset()}>Tentar novamente</button>
        </div>
      </body>
    </html>
  )
}
