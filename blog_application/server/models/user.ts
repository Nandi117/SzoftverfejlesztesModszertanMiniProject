import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the IUser interface
export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  profile_picture?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  validTo?: Date; // Make validTo optional
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema for the User model
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 50,
    minLength: 8,
  },
  password_hash: {
    type: String,
    required: true,
    maxLength: 255,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  validTo: {
    type: Date,
    default: null, // This can be set to null
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Password comparison method
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password_hash, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
}; 

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
