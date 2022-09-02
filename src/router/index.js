import About from '../pages/About';
import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';

export const privateRoutes = [
  { path: '/about', Component: About },
  { path: '/posts', Component: Posts },
  { path: '/posts/:id', Component: PostIdPage },
	{ path: '/login', Component: Login },
	{ path: '/not-found-page', Component: NotFoundPage }
];

export const publicRoutes = [{ path: '/login', Component: Login }];
