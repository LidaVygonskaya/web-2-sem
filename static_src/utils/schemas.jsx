import { schema } from 'normalizr';

export const user = new schema.Entity('users');
export const post = new schema.Entity('posts', {
    author: user,

});
export const event = new schema.Entity('events', {
    author: user,

});
export const follower = new schema.Entity('followers', );
export const following = new schema.Entity('followings', );