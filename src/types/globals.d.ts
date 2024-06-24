interface ChildrenComponent {
  children: React.ReactNode;
}

interface ResponseModel<Data = any, Error = string> {
  isSucceed: boolean;
  data: Data;
  error: Error;
}
