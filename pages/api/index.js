import dbConnect from '../../api/dbConnect';
import Todo from '../../api/models/Todo';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const todo = await Todo.create(req.body);
        res.status(201).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const todo = await Todo.deleteOne({ _id: req.body._id });
        if (!todo) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
