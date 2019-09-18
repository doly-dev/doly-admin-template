// pages
import HomePage from "~/pages/home";
import ExamplePage from "~/pages/example";
import ExceptionPage from "~/pages/exception";

export default [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/example",
    component: ExamplePage
  },
  {
    path: "/404",
    component: ExceptionPage
  }
];
