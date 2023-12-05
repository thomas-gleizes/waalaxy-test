import AuthForm from "../../components/AuthForm.tsx"
import Card from "../../components/common/Card.tsx"
import { css } from "../../../styled-system/css"

const LoginPage = () => {
  return (
    <div className={css({ display: "flex", w: "full", justifyContent: "space-evenly", my: 8 })}>
      <div>
        <Card title="Connexion">
          <AuthForm action="login" />
        </Card>
      </div>
      <div>
        <Card title="Inscription">
          <AuthForm action="register" />
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
