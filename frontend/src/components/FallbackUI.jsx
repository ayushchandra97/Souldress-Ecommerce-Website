/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button"

export default function FallbackUI({ error, resetErrorBoundary }) {
  return (
    <main className="flex-body d-flex justify-content-center align-items-center flex-column">
      <h1 className="text-primary">{error.message}</h1>
      <Button className="btn-theme" onClick={resetErrorBoundary}>Retry</Button>
    </main>
  )
}
