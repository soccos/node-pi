module.exports = {
  a: {
    POST: {
      operation: 'addArticle'
    },
    parameter: {
      GET: {
        operation: 'viewArticle',
      },
      PATCH: {
        operation: 'modifyArticle'
      },
      DELETE: {
        operation: 'deleteArticle'
      },
      comment: {
        parameter: {
          GET: {
            operation: 'viewArticleComment',
          },
          PATCH: {
            operation: 'modifyArticleComment'
          },
          DELETE: {
            operation: 'deleteArticleComment'
          }
        }
      }
    }
  },
  f: {
    POST: {
      operation: 'addForum'
    },
    parameter: {
      GET: {
        operation: 'viewForum'
      },
      PATCH: {
        operation: 'modifyForum'
      },
      DELETE: {
        operation: 'deleteForum'
      }
    }
  },
  m: {
    GET: {
      operation: 'viewManagement'
    }
  },
  editor: {
    GET: {
      operation: 'viewEditor'
    }
  },
  login: {
    GET: {
      operation: 'viewLogin'
    },
    POST: {
      operation: 'login'
    }
  },
  register: {
    GET: {
      operation: 'viewRegister'
    },
    POST: {
      operation: 'register'
    }
  },
  //-- send email --
  send: {
    email: {
      register: {
        POST: {
          operation: 'sendRegisterEmail'
        }
      },
      forgetPassword: {
        POST: {
          operation: 'sendForgetPasswordEmail'
        }
      }
    }
  }
};