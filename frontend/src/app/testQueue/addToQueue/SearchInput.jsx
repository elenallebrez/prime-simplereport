import React from "react";

import Button from "../../commonComponents/Button";
import TextInput from "../../commonComponents/TextInput";

const SearchInput = ({
  onSearchClick,
  onInputChange,
  queryString,
  disabled,
}) => {
  return (
    <React.Fragment>
      <form className="usa-search width-full margin-bottom-2 margin-left-1" role="search">
        <TextInput
          type="search"
          placeholder="Search by Unique Patient ID or Name"
          value={queryString}
          onChange={(e) => onInputChange(e)}
          name="add-to-queue-search"
          addClass="usa-input"
          
        />
        <Button
          type="submit"
          onClick={(e) => onSearchClick(e)}
          icon="search"
          disabled={disabled}
          addClass="usa-button"
        />
      </form>

      

     

    </React.Fragment>
  );
};

export default SearchInput;
