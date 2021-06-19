import {VuexModule, Module, Action, Mutation, getModule} from "vuex-module-decorators";
import {User} from '@/models/types/User';
import store from '@/store';

@Module({dynamic: true, store, name: 'UserStore', namespaced: true})
export class UserStore extends VuexModule {
    user: User = JSON.parse(<string>localStorage.getItem('user-info')) || {};

    get userInfo(): User {
        return this.user;
    }

    get isLoggedIn(): boolean {
        return Object.keys(this.user).length !== 0
    }

    @Action({rawError: true})
    setUserInfo(payload: User): void {
        this.SET_USER_INFO(payload);
    }

    @Action({rawError: true})
    logout(): void {
        this.LOG_OUT();
    }

    @Mutation
    SET_USER_INFO(payload: User): void {
        this.user = payload;
    }

    @Mutation
    LOG_OUT(): void {
        this.user = {};
        localStorage.removeItem('user-info');
        localStorage.removeItem('token');
    }
}

export default getModule(UserStore);
