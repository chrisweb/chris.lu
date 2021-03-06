<?php

class Playlist_Bootstrap extends Zend_Application_Module_Bootstrap {   

	protected $moduleName = 'Playlist';
	protected $modulePath;

    public function __construct($application) {

        parent::__construct($application);
		
		$this->modulePath = APPLICATION_PATH.'/modules/'.strtolower($this->moduleName).'/';

	}
    
	protected function _initModuleConfiguration()
	{
	
		$configurationPath = $this->modulePath.'configs/config.xml';
		
		$moduleConfigObject = new Zend_Config_Xml($configurationPath, APPLICATION_ENV);
		
		Zend_Registry::set($this->moduleName.'Configuration', $moduleConfigObject);
	
	}

	protected function _initModuleRoutes()
	{
	
        // TODO: use masterfile cache to cache routes configuration
        
        $routesPath = $this->modulePath.'configs/routes.xml';

        $front = Zend_Controller_Front::getInstance();
        $router = $front->getRouter();

		$routesConfigObject = new Zend_Config_Xml($routesPath);

        $router->addConfig($routesConfigObject);
	
	}
	
	protected function _initModuleTranslations()
	{
	
        $translationsPath = $this->modulePath.'configs/translations.tmx';

		$bootstrap = $this->getApplication();
		$translate = $bootstrap->getResource('ApplicationTranslations');
		
		//Zend_Debug::dump($translationsPath);
		
		$translate->addTranslation($translationsPath, 'en');
	
	}
		
}