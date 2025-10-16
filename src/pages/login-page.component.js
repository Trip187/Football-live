import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Login from "./login_user.png";
import { signInWithGooglePopup } from "../utils/firebase.utils";
import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
const LoginPage = () => {
  const { setCurrentUser } = useContext(UserContext);
  const signinWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    setCurrentUser(response.user);
  };

  return (
    <Card
      style={{
        width: "25rem",
        display: "flex",
        alignItems: "center",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Card.Img variant="top" src={Login} />
      <Card.Body>
        <Card.Title>Google Sign In</Card.Title>
        <Card.Text>Kick off your experience — sign in with Google!</Card.Text>
        <Button variant="primary" onClick={signinWithGoogle}>
          Sign In with Google
        </Button>
      </Card.Body>
    </Card>
  );
};
export default LoginPage;
