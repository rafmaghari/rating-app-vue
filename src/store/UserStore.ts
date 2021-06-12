import {VuexModule, Module, Action, Mutation, getModule} from "vuex-module-decorators";
import {User} from '@/models/User';
import store from '@/store';

@Module({dynamic: true, store, name: 'UserStore', namespaced: true})
export class UserStore extends VuexModule {
    user: User = {};

    get userInfo(): User {
        return this.user;
    }

    @Action({rawError: true})
    setUserInfo(payload: User): void {
        this.SET_USER_INFO(payload);
    }

    @Mutation
    SET_USER_INFO(payload: User): void {
        this.user = payload;
    }
}

export default getModule(UserStore);
