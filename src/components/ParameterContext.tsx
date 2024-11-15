"use client"
import { createContext, ReactNode, useContext, useState } from "react";

// Define types for the parameters
type ParameterContextType = {
    ammonia: number | null;
    temperature: number | null;
    humidity: number | null;
    setAmmonia: (value: number | null) => void;
    setTemperature: (value: number | null) => void;
    setHumidity: (value: number | null) => void;
};

// Create the context with default values
const ParameterContext = createContext<ParameterContextType | undefined>(undefined);

// Create a provider to wrap your app and provide the data
export const ParameterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ammonia, setAmmonia] = useState<number | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);

    return (
        <ParameterContext.Provider
            value={{ ammonia, temperature, humidity, setAmmonia, setTemperature, setHumidity }}
        >
            {children}
        </ParameterContext.Provider>
    );
};

// Custom hook to use the context
export const useParameters = (): ParameterContextType => {
    const context = useContext(ParameterContext);
    if (!context) {
        throw new Error("useParameters must be used within a ParameterProvider");
    }
    return context;
};
