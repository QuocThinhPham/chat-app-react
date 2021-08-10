import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";
import AppProvider from "./Context/AppProvider";
import AuthProvider from "./Context/AuthProvider";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Switch>
                        <Route path="/" exact component={ChatRoom} />
                        <Route path="/login" component={Login} />
                    </Switch>
                    <AddRoomModal />
                    <InviteMemberModal />
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
