import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  password: string;

  @Prop()
  is_google_login: string;

  @Prop()
  hashed_refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
