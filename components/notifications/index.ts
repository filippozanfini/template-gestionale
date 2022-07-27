import NotificationsCenter from "./NotificationsCenter"
import NotificationsContainer, { alert } from "./NotificationContainer"
import { useAppDispatch } from '../../redux/store'
import { NotificationItem, add as addNotify} from './redux/notificationsReducer'

const Center = NotificationsCenter;
const Container = NotificationsContainer;

const useNotify = () => {
    const dispatch = useAppDispatch()
    return (item:NotificationItem) => {
          dispatch(addNotify(item));
    }
}

const useAlert = () =>{
    return (item: NotificationItem) => alert(item);
}

const Notifications = {
    Center,
    Container,
    useNotify,
    useAlert
};

export default Notifications;
export {
    Center,
    Container,
    useNotify,
    useAlert
};