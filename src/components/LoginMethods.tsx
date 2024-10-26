import React from 'react';
import { User, Wand2 } from 'lucide-react';

interface LoginMethodsProps {
  loginMethod: 'account' | 'magic';
  setLoginMethod: (method: 'account' | 'magic') => void;
}

const LoginMethods: React.FC<LoginMethodsProps> = ({ loginMethod, setLoginMethod }) => {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      <button
        onClick={() => setLoginMethod('account')}
        className={`flex items-center px-4 py-2 rounded-md ${
          loginMethod === 'account'
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <User className="h-5 w-5 mr-2" />
        Account ID
      </button>
      <button
        onClick={() => setLoginMethod('magic')}
        className={`flex items-center px-4 py-2 rounded-md ${
          loginMethod === 'magic'
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Wand2 className="h-5 w-5 mr-2" />
        Magic Link
      </button>
    </div>
  );
};

export default LoginMethods;