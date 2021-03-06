<?php
/**
 * Bootstrap do's and dont's from Rob Allen: http://mwop.net/blog/234-Module-Bootstraps-in-Zend-Framework-Dos-and-Donts.html
 **/
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

	protected $applicationConfiguration;
	protected $applicationFrontController;
	protected $ajaxStatus;
	
	protected $filesCache;
	protected $masterFilesCache;
	protected $apcCache;
    protected $cache;
	
	// error: "Circular resource dependency detected"
	// i often use the word "Application" in init method names to
	// avoid conflicts with resources which could have the same name
	
    /**
     * 
     * @return type
     */
	protected function _initApplicationFrontController()
    {
	
		$this->bootstrap('Frontcontroller');
		$this->applicationFrontController = $this->getResource('Frontcontroller');

        return $this->applicationFrontController;
    }
	
    /**
     * 
     * @return type
     */
	protected function _initApplicationAutoloader()
	{
	
		$autoLoader = Zend_Loader_Autoloader::getInstance();
	
        // https://github.com/chrisweb/zend-framework-1-oauth-2-library
        $autoLoader->registerNamespace('Chrisweb_');
        
        // chris.lu library
		$autoLoader->registerNamespace('Chris_');
		
		return $autoLoader;
	
	}

    /**
     * 
     * @return \Zend_Application_Module_Autoloader
     */
	protected function _initApplicationModulesAutoloader()
    {
	
        $modulesAutoLoader = new Zend_Application_Module_Autoloader(array(
            'namespace' => '',
            'basePath'  => APPLICATION_PATH));

        return $modulesAutoLoader;
    }
	
    /**
     * 
     * @return type
     */
	protected function _initApplicationLibrariesAutoloader()
	{
	
		$librariesAutoloader = Zend_Loader_Autoloader::getInstance();
		
		$librariesAutoloader->registerNamespace('Chris');
		
		return $librariesAutoloader;
	}
	
    /**
     * 
     * @return type
     */
	protected function _initApplicationConfiguration()
    {
        
		// check out the public/index.php file to see
		// what we do with the configuration
		
		$this->applicationConfiguration = Zend_Registry::get('ApplicationConfiguration');
		
        return $this->applicationConfiguration;
    }
	
    /**
     * 
     * @return \Zend_Log
     */
    protected function _initApplicationLogging()
	{

        $logsDir = APPLICATION_PATH.'/logs';
		$logsFileName = 'application.log';

        if (!is_dir($logsDir)) @mkdir($logsDir, 0755);

        $logger = new Zend_Log();

        $writer = new Zend_Log_Writer_Stream($logsDir.'/'.$logsFileName);
        $logger->addWriter($writer);

        return $logger;
    }
	
    /**
     * 
     */
	protected function _initApplicationResponse()
	{
	
		$this->frontController->registerPlugin(new Chris_Controller_Plugin_Headers());

	}
    
    /**
     * 
     * @return type
     */
	protected function _initApplicationRoutes()
	{
	
        $front = Zend_Controller_Front::getInstance();
        $router = $front->getRouter();
        
        // remove the default "/:controller/:action" and "" (root url) routes
        // as we will just use custom routes
        $router->removeDefaultRoutes();
		
		return $router;
	}
	
    /**
     * 
     * @return type
     */
    protected function _initApplicationView()
    {
	
		$this->bootstrap('View');
		$view = $this->getResource('View');
		
        $view->doctype($this->applicationConfiguration->website->doctype);
        $view->setEncoding($this->applicationConfiguration->website->encoding);
        $view->headTitle($this->applicationConfiguration->website->title)->setSeparator(' :: ');
		
		// set path for global / module independent view helpers
		$view->addHelperPath(APPLICATION_PATH.'/layouts/helpers/', 'Application_Layouts_Helpers');
		
		// set path for global / module independant pagination view scripts
		$view->addScriptPath(APPLICATION_PATH.'/layouts/scripts/');
 
        $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper(
            'ViewRenderer'
        );
        $viewRenderer->setView($view);
 
        return $view;
    }
	
    /**
     * 
     * @return type
     */
    protected function _initAjaxDetection()
	{

		$this->ajaxStatus = false;
	
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

            $this->ajaxStatus = true;

        }

        return $this->ajaxStatus;

    }
	
    /**
     * 
     * @return type
     */
	protected function _initDatabaseConnection()
	{
	
		$databaseType = $this->applicationConfiguration->database->type;
			
		switch ($databaseType) {
			case 'mysql':
				$databaseConnection = $this->getPluginResource('db')->getDbAdapter();
				$databaseConnection->setFetchMode(Zend_Db::FETCH_OBJ);
				break;
			case 'mongodb':
				$mongoConnection = new Mongo();
				$databaseConnection = $mongoConnection->selectDB('chrislu');
				break;
		}

		return $databaseConnection;

	}
	
    /**
     * 
     * @return \Zend_Db_Profiler
     */
    protected function _initMysqlDatabaseProfiler()
	{
	
		$databaseType = $this->applicationConfiguration->database->type;

		if ($databaseType == 'mysql') {
	
			$profilerAction = $this->applicationConfiguration->resources->db->params->profiler;

			if ($profilerAction && APPLICATION_ENVIRONMENT != 'production' && $this->ajaxStatus === false) {

				$this->bootstrap('db');
				$profiler = new Zend_Db_Profiler('All DB Queries');
				$profiler->setEnabled(true);
				$this->getPluginResource('db')->getDbAdapter()->setProfiler($profiler);

				Zend_Registry::set('Profiler', $profiler);

				$this->frontController->registerPlugin(new Chris_Controller_Plugin_MysqlDatabaseProfiler());

				return $profiler;

			}
			
		}

    }
	
	/**
     * 
     * usefull to cache database queries if no memory cache like apc or memcache is available
     * 
     * @return type
     */
    protected function _initFilesCache()
	{

		$filesCacheDirectory = APPLICATION_PATH.'/caches';
        
        if (!is_dir($filesCacheDirectory)) @mkdir($filesCacheDirectory, 0755);

		// we already checked in public/index.php if the directory exists
		
        $cacheFrontendAdapter = $this->applicationConfiguration->files->cache->frontend->adapter;
        $cacheBackendAdapter = $this->applicationConfiguration->files->cache->backend->adapter;

        $filesCacheLifetime = $this->applicationConfiguration->files->cache->lifetime;

        $filesCacheOptions = array(
            'frontend' => array(
                'automatic_serialization' => true,
                'lifetime' => $filesCacheLifetime
            ),
            'backend' => array(
                'cache_dir' => $filesCacheDirectory
            )
        );

        $this->filesCache = Zend_Cache::factory($cacheFrontendAdapter, $cacheBackendAdapter, $filesCacheOptions['frontend'], $filesCacheOptions['backend']);

        return $this->filesCache;

    }
	
	/**
     * 
     * usefull to cache loaded files, like routes configuration, acl rules or translation files
	 * the masterfiles cache will automatically get updated every time a file content changes
     * 
     * @return type
     */
    protected function _initMasterFilesCache()
	{
	
        // TODO: implement master file cache
		$this->masterFilesCache = '';
		
		return $this->masterFilesCache;
        
	}
	
	/**
     * 
     * usefull to cache database queries
     * 
     * @return type
     */
    protected function _initAPCCache()
	{
        
        if (APC_SUPPORT) {
        
            $cacheFrontendAdapter = $this->applicationConfiguration->apc->cache->frontend->adapter;
            $cacheBackendAdapter = $this->applicationConfiguration->apc->cache->backend->adapter;

            $apcCacheLifetime = $this->applicationConfiguration->apc->cache->lifetime;

            $apcCacheOptions = array(
                'frontend' => array(
                    'automatic_serialization' => true,
                    'lifetime' => $apcCacheLifetime
                ),
                'backend' => array()
            );

            $this->apcCache = Zend_Cache::factory($cacheFrontendAdapter, $cacheBackendAdapter, $apcCacheOptions['frontend'], $apcCacheOptions['backend']);

            return $this->apcCache;
            
        }
        
	}
    
    /**
     * 
     * use apc cache or if not available switch to file cache
     * 
     * @return type
     */
    protected function _initCacheSwitch()
    {
        
        if (APC_SUPPORT) {
        
            $this->cache = $this->getResource('APCCache');
            
        } else {
            
            $this->cache = $this->getResource('FilesCache');
            
        }
        
        return $this->cache;
        
    }
    
    /**
     * load user (client) language detection plugin
     */
    protected function _initApplicationLanguageDetection()
	{

		$this->frontController->registerPlugin(new Chris_Controller_Plugin_LanguageDetection());
        
    }

    /**
     * 
     * @return \Zend_Translate
     */
	protected function _initApplicationTranslations()
	{
        
        Zend_Translate::setCache($this->cache);
        
        $translationsPath = APPLICATION_PATH.'/configs/translations.tmx';
		
		$translate = new Zend_Translate('tmx', $translationsPath, 'en');

		// TODO: replace with bootstrap invoke arg system
        Zend_Registry::set('Translate', $translate);
        
        Zend_Form::setDefaultTranslator($translate);
        //Zend_Validate_Abstract::setDefaultTranslator($translate);
		
		return $translate;
	
	}
    
    /**
     * 
     * @return type
     */
    protected function _initApplicationLocale()
	{

		$this->bootstrap('Locale');
		$locale = $this->getResource('Locale');
	
        Zend_Locale::setCache($this->cache);
        
        $locale->setDefault('en');

		return $locale;
        
    }
	
    /**
     * 
     */
	protected function _initLanguageRoutes()
	{
	
		$this->frontController->registerPlugin(new Chris_Controller_Plugin_LanguageRoute());
	
	}
	
    /**
     * 
     */
    protected function _initActionHelpers()
	{

		//Zend_Debug::dump('initialize action helpers');
	
        Zend_Controller_Action_HelperBroker::addPrefix('Chris_Controller_Action_Helper');

    }
	
    /**
     * 
     * @return \Zend_Session_Namespace
     */
	protected function _initApplicationSession()
	{
	
		$session = new Zend_Session_Namespace('MyWebsiteSession', true);
		
		return $session;
	}
	
    /**
     * 
     */
	protected function _initApplicationAuthentification()
    {
	
		$this->frontController->registerPlugin(new Chris_Controller_Plugin_Authentification());
	
	}
	
    /**
     * 
     */
	protected function _initApplicationAuthorisation()
    {
	
		$this->frontController->registerPlugin(new Chris_Controller_Plugin_Authorisation());
	
	}
	
    /**
     * 
     */
	protected function _initApplicationPaginator()
	{
	
        $partial = '_partials/paginationControl.phtml';
        Zend_View_Helper_PaginationControl::setDefaultViewPartial($partial);
	
	}
    
    /**
     * 
     */
	protected function _initBugsnag()
	{
    
        // bugsnag tool
        if (APPLICATION_ENV === 'production') {

            require_once('../library/Bugsnag/lib/bugsnag.php');

            Bugsnag::register($this->applicationConfiguration->bugsnag->api->key);
            Bugsnag::setReleaseStage(APPLICATION_ENV);
            Bugsnag::setNotifyReleaseStages('production');
            Bugsnag::setUseSSL(true);
            Bugsnag::setProjectRoot(APPLICATION_PATH.'/../');
            //Bugsnag::setFilters('password');
            
            $auth = Zend_Auth::getInstance();
            
            if ($auth->hasIdentity()) {
                
                $identity = $auth->getIdentity();
                
                Bugsnag::setUserId($identity->username.' '.$identity->role);
                
            } else {
                
                $userIp = isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];

                Bugsnag::setUserId($userIp.' guest');
                
            }
            
            Bugsnag::setContext($this->ajaxStatus);

            set_error_handler('Bugsnag::errorHandler');
            //set_exception_handler("Bugsnag::exceptionHandler");

        }
	
    }
        
}