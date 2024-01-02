const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 7000;

// Kết nối tới MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/banner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định nghĩa schema cho banner
const bannerSchema = new mongoose.Schema({
  maBanner: Number,
  maPhim: Number,
  hinhAnh: String,
});

// Tạo model từ schema
const Banner = mongoose.model("Banner", bannerSchema);

// Sử dụng body-parser để đọc dữ liệu từ request body
app.use(bodyParser.json());

// Định nghĩa các route

// Lấy danh sách banner
app.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lấy thông tin của banner theo mã
app.get("/banners/:maBanner", async (req, res) => {
  try {
    const banner = await Banner.findOne({ maBanner: req.params.maBanner });
    if (!banner) {
      res.status(404).json({ error: "Banner not found" });
      return;
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
