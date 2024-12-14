const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model('User', userSchema);
  
  // 회원가입
  app.post('/auth/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send({ message: 'User registered successfully!' });
  });
  
  // 로그인
  app.post('/auth/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.send({ token });
  });
  