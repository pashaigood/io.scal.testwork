import axios from "axios";
import { normalize, schema } from "normalizr";
import { User } from "../types";

const usersSchema = new schema.Array(
  new schema.Entity(
    "users",
    {},
    {
      processStrategy: (value: any) => {
        return {
          id: value.id + "",
          type: value.type,
          login: value.login,
          avatarUrl: value.avatar_url,
        };
      },
    }
  )
);

export async function searchUsersByLogin(
  login: string
): Promise<{ [key: string]: User }> {
  const {
    data: { items },
  } = await axios.get(
    `https://api.github.com/search/users?q=${login} in:login`
  );
  const normalizedData = normalize(items, usersSchema);

  return normalizedData.entities.users || [];
}
