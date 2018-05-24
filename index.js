const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());


// Create Courses Array
const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" }
];

// Home Page Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// View All Courses Route
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Add New Course Route
app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// Get Single Course Route
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("That course was not found");
  res.send(course);
});


// Set port from env variable or default ot 3000
const port = process.env.PORT || 3000;

// Set up app listener
app.listen(port, console.log(`Listening on port ${port}`));
