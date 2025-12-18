exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      message: "Admin login successful"
    });
  }

  return res.status(401).json({
    message: "Invalid admin credentials"
  });
};
