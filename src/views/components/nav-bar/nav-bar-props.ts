export default interface INavBarProps {
    isAuthenticated: boolean;
    logout: () => Promise<void>;
}