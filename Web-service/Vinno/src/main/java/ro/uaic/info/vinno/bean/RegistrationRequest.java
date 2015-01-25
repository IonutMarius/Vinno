package ro.uaic.info.vinno.bean;

import java.io.Serializable;

public class RegistrationRequest implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String username;
	private String password;
	private String passwordConf;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPasswordConf() {
		return passwordConf;
	}
	public void setPasswordConf(String passwordConf) {
		this.passwordConf = passwordConf;
	}	
}