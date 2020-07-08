export default interface INavBarProps {
    isAuthenticated: boolean;
    firstName: string;
    logout: () => Promise<void>;
}