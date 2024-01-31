import { handleGitHubLogin } from "@lib/actions";

const LoginPage = async () => {
  return (
    <div>
      <form action={handleGitHubLogin} >
        <button>Login with GitHub</button>
      </form>
    </div>
  );
};

export default LoginPage;