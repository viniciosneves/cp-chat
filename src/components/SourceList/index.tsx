import React from 'react';
import styled from 'styled-components';

interface Source {
    title: string;
    link: string;
}

interface SourceListProps {
    sources: Source[];
}

const ListContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const SourceItem = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  transition: color 0.2s;
`;

const SourceList: React.FC<SourceListProps> = ({ sources }) => {
    if (sources.length == 0) {
        return null
    }
    return (
        <ListContainer>
            {sources.map((source, index) => (
                <SourceItem key={index} >
                    Source: {source.title} <br />
                    Link: 
                    <a href={source.link} target="_blank" rel="noopener noreferrer">
                        {source.link}
                    </a>
                    
                </SourceItem>
            ))}
        </ListContainer>
    );
};

export default SourceList;