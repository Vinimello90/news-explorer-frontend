const INTERNAL_SERVER_ERROR = 500;
const CONFLICT_ERROR = 409;
const UNAUTHORIZED_ERROR = 401;
const BAD_REQUEST = 400;

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

  if (statusCode === BAD_REQUEST) {
    return {
      message: "E-mail inválido, verifique e tente novamente!",
    };
  }
}
