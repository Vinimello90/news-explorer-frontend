const INTERNAL_SERVER_ERROR = 500;
const CONFLICT_ERROR = 409;
const UNAUTHORIZED_ERROR = 401;

export function authErrorHandler(err) {
  const { statusCode = 500 } = err;

  if (statusCode === INTERNAL_SERVER_ERROR) {
    return {
      message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
    };
  }

  if (statusCode === CONFLICT_ERROR) {
    return {
      message: "Erro ao criar conta! E-mail já cadastrado.",
    };
  }

  if (statusCode === UNAUTHORIZED_ERROR) {
    return {
      message: "E-mail ou senha inválida, verifique e tente novamente!",
    };
  }
}
