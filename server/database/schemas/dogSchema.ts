import { Schema, model } from 'mongoose';

const dogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    dogPhoto: {
      type: String,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'dateAdded' } }
);

const Dog = model('dogs', dogSchema);

export { Dog };
