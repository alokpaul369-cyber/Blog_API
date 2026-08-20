const express = require("express");

const app = express();
const PORT = 3000;

const blogs = [];
let nextId = 1;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request received: ${req.method}${req.path}`);
  next();
});

app.post("/api/blogs", (req, res) => {
  const { title, description, author } = req.body;

  if (!title || !description || !author) {
    return res.status(400).json({
      success: false,
      message: "Title, description, and author are required",
      data: {},
    });
  }

  const blog = {
    id: nextId++,
    title,
    description,
    author,
  };

  blogs.push(blog);

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});

app.get("/api/blogs", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

app.get("/api/blogs/:id", (req, res) => {
  const blog = blogs.find((item) => item.id === Number(req.params.id));

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      data: {},
    });
  }

  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    data: blog,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
