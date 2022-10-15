const { ObjectId } = require("mongodb");
const { connect } = require("../configs/dbconn.js");

//@desc Get all events
//@route GET /api/v3/app/?id=_id
//@access Public

const dbGet = async (req, res) => {
  const collection = await connect();
  const _id = req.query.id;
  if (_id == undefined) {
    const type = req.query.type;
    const limit = req.query.limit;
    const page = req.query.page;
    console.log(type + " " + limit + " " + page);
    if (type == "latest") {
      const result = await collection
        .find({})
        .sort({ date: -1 })
        .limit(parseInt(limit))
        .toArray();
      res.status(200).json(result);
    } else res.status(200).json("Invalid body params");
  } else {
    const result = await collection.find({ _id: new ObjectId(_id) }).toArray();
    res.status(200).json(result);
  }

  return "Fetch data success";
};

//@desc Update an event
//@route PUT /api/v3/app/:id
//@access Public

const dbPost = async (req, res) => {
  const collection = await connect();
  const data = req.body;
  const type = data["type"];
  const uid = data["uid"];
  const name = data["name"];
  const tagline = data["tagline"];
  const schedule = data["schedule"];
  const description = data["description"];
  const file = data["files[image]"];
  const moderator = data["moderator"];
  const category = data["category"];
  const sub_category = data["sub_category"];
  const rigor_rank = data["rigor_rank"];
  const attendees = data["attendees"];

  try {
    collection.insertOne({
      type: type,
      uid: uid,
      name: name,
      tagline: tagline,
      schedule: schedule,
      description: description,
      date: new Date(),
      file: file,
      moderator: moderator,
      category: category,
      sub_category: sub_category,
      rigor_rank: rigor_rank,
      attendees: attendees,
    });
    res.status(200).json("Post data success");
  } catch (error) {
    res.status(500).json("Failed to post data");
  }
};

//@desc Update an event
//@route PUT /api/v3/app/:id
//@access Public

const dbPut = async (req, res) => {
  const collection = await connect();
  const data = req.body;
  const id = req.params.id;
  const type = data["type"];
  const uid = data["uid"];
  const name = data["name"];
  const tagline = data["tagline"];
  const schedule = data["schedule"];
  const description = data["description"];
  const file = data["files[image]"];
  const moderator = data["moderator"];
  const category = data["category"];
  const sub_category = data["sub_category"];
  const rigor_rank = data["rigor_rank"];
  const attendees = data["attendees"];

  try {
    collection.insertOne({
      _id: ObjectId(id),
      type: type,
      uid: uid,
      name: name,
      tagline: tagline,
      schedule: schedule,
      description: description,
      date: new Date(),
      file: file,
      moderator: moderator,
      category: category,
      sub_category: sub_category,
      rigor_rank: rigor_rank,
      attendees: attendees,
    });
    res.status(200).json(id + " updated");

    return "Update data success";
  } catch (error) {
    console.error(error);
  }
};

//@desc Delete an event
//@route DELETE /api/v3/app/:id
//@access Public

const dbDelete = async (req, res) => {
  const collection = await connect();
  const _id = req.params.id;
  try {
    await collection.deleteOne({ _id: ObjectId(_id) });
    res.status(200).json("Successfully deleted data with id" + _id);
    return "Successfully deleted data with id" + _id;
  } catch (error) {
    res.status(500).json("Delete data failed");
  }
};

module.exports = { dbGet, dbPost, dbPut, dbDelete };
