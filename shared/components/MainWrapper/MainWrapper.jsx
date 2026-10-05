import { Header } from "../Header/Header";

export const MainWrapper = ({ children }) => {
  return (
    <div className={`site-wrapper`}>
      <Header />
      <div className="site-content">
        <div className="site-inside">{children}</div>
      </div>
    </div>
  );
};
