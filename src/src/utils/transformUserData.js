const transformUserData = (data, userEmail) => {
  return {
    userEmail,
    institutes: data.map((inst) => ({
      inst_id: inst.inst_id,
      institute_name: inst.institute_name,
      inst_logo: inst.inst_logo,
      roles: inst.roles || [],
      
    }))
  };
};

export default transformUserData;