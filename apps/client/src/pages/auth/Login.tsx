import LoginForm from "../../components/LoginForm.tsx"
import Card from "../../components/common/Card.tsx"
import { css } from "../../../styled-system/css"

const LoginPage = () => {
  return (
    <div className={css({ display: "flex", w: "full", justifyContent: "center", my: 8 })}>
      <div>
        <Card title="Connexion">
          <LoginForm />
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
