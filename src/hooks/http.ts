import { useState, useEffect, DependencyList } from 'react';

export function useHttp<T>(url : string, dependencies : DependencyList) : [boolean, T?] {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState<T | undefined>(undefined);

    //   fetch('https://swapi.co/api/people')
    useEffect(() => {
        setIsLoading(true);
        console.log('Sending Http request to URL: ' + url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch.');
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false);
                setFetchedData(data);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, dependencies);

    return [isLoading, fetchedData];
};