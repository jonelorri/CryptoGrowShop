import {App2} from './App2.jsx';
import {Main} from './Main.jsx';
import { Route, Routes} from 'react-router-dom';

export function App () {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/account" element={<App2/>} />
            </Routes>
        </div>
    );
}