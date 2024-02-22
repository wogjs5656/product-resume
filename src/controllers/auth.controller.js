export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  generateNewAccessTokenByFreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    const token = await verifyFreshToken(refreshToken);
    return res.json(token);
  };

}
