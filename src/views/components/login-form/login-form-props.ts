export default interface ILoginFormProps {
    login(data: object): Promise<any>;
}