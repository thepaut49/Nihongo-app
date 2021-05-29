import React, { useEffect } from "react";
import "./SuffixsPage.css";
import SuffixList from "./SuffixList";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";
import * as suffixActions from "../../redux/actions/suffixActions";
import { connect } from "react-redux";

function SuffixsPage(props) {
  useEffect(() => {
    const { suffixs, actions } = props;
    if (suffixs.length === 0) {
      actions.loadSuffixs().catch((error) => {
        alert("Loading iadjectives failed" + error);
      });
    }
  }, []);
  // le second arg [] empeche de relancer en boucle l'appel à l'api

  const handleDeleteSuffix = async (suffix) => {
    toast.success("Suffix deleted");
    try {
      await props.actions.deleteSuffix(suffix);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="suffixsPage">
      <h2>Suffixs</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <Link className="btn btn-primary" to="/suffix/create">
            Add Suffix
          </Link>
          <SuffixList
            suffixs={props.suffixs}
            deleteSuffix={handleDeleteSuffix}
          />
        </>
      )}
    </div>
  );
}

SuffixsPage.propTypes = {
  suffixs: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    suffixs: state.suffixs.map((suffix) => {
      return {
        ...suffix,
      };
    }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadSuffixs: bindActionCreators(suffixActions.loadSuffixs, dispatch),
      deleteSuffix: bindActionCreators(suffixActions.deleteSuffix, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SuffixsPage);
