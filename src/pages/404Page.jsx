import { Container } from "react-bootstrap"

const ErrorPage = () => {
    return  <Container
    className="d-flex align-items-center justify-content-center "
    style={{ height: "100vh" }}
  >
    <div className="p-5 border rounded-4 bg-light">
      <h1>Böyle bir sayfa yok!</h1>
    </div>
  </Container>
}

export default ErrorPage